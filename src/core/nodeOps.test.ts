import {
  useNodeOpsWithContext,
  forImplementationTests as implementation,
  TresNodeOpsPlugin,
  TresNodeOpsPluginStore,
} from "./nodeOps";

const myPlugin = {
  name: "My Plugin",
  setup: () => {},
  createElement: (context: Object) => (tag: string) => {
    return { tag };
  },
};

describe("nodeOps", () => {
  describe("useNodeOpsWithContext", () => {
    it("returns an object that exposes the Vue RendererOptions API", () => {
      const nodeOps = useNodeOpsWithContext({});
      expect(nodeOps.patchProp).toBeTypeOf("function");
      expect(nodeOps.insert).toBeTypeOf("function");
      expect(nodeOps.remove).toBeTypeOf("function");
      expect(nodeOps.createElement).toBeTypeOf("function");
      expect(nodeOps.createText).toBeTypeOf("function");
      expect(nodeOps.createComment).toBeTypeOf("function");
      expect(nodeOps.setText).toBeTypeOf("function");
      expect(nodeOps.setElementText).toBeTypeOf("function");
      expect(nodeOps.parentNode).toBeTypeOf("function");
      expect(nodeOps.nextSibling).toBeTypeOf("function");
    });
    it("returns an object that exposes the PluginStore API", () => {
      const nodeOps = useNodeOpsWithContext({});
      expect(nodeOps.hasPlugin).toBeTypeOf("function");
    });
    it("returns the same nodeOps for a given context", () => {
      const contextA = {};
      const nodeOpsA0 = useNodeOpsWithContext(contextA);
      const nodeOpsA1 = useNodeOpsWithContext(contextA);
      expect(nodeOpsA0).equals(nodeOpsA1);
    });
    it("returns different nodeOps for different contexts", () => {
      const contextA = {};
      const contextB = {};
      const nodeOpsA = useNodeOpsWithContext(contextA);
      const nodeOpsB = useNodeOpsWithContext(contextB);
      expect(nodeOpsA).not.equals(nodeOpsB);
    });
  });

  describe("nodeOps.addPlugin", () => {
    it("adds a plugin", () => {
      const plugin = () => ({
        name: "mySimplePlugin",
        createElement: () => ({}),
      });
      const nodeOps = useNodeOpsWithContext({}, plugin);
      assert(nodeOps.hasPlugin("mySimplePlugin"));
    });

    it("adds an array of plugins", () => {
      const plugin1: TresNodeOpsPlugin<Object, Object, Object> = () => ({
        name: "p1",
        createElement: {
          fn: () => ({}),
          weight: 1,
        },
      });
      const plugin2: TresNodeOpsPlugin<Object, Object, Object> = () => ({
        name: "p2",
        createElement: () => ({}),
      });
      const nodeOps = useNodeOpsWithContext({}, [plugin1, plugin2]);
      expect(nodeOps.hasPlugin("p1")).equals(true);
      expect(nodeOps.hasPlugin("p2")).equals(true);
    });

    it("throws an error if two plugins with the same name are added", () => {
      const plugin1: TresNodeOpsPlugin<Object, Object, Object> = () => ({
        name: "p1",
        createElement: {
          fn: () => ({}),
          weight: 1,
        },
      });
      const plugin2: TresNodeOpsPlugin<Object, Object, Object> = () => ({
        name: "p1",
        createElement: () => ({}),
      });
      const addsPluginWithSameName = () =>
        useNodeOpsWithContext({}, [plugin1, plugin2]);
      expect(addsPluginWithSameName).toThrowError();
    });

    it("filters createElement calls by tag", () => {
      const plugin1: TresNodeOpsPlugin<
        { text: string },
        { text: string },
        Object
      > = () => ({
        name: "p1",
        filter: {
          tag: (tag: string) => tag === "Awesome tag",
        },
        createElement: {
          fn: (tag) => ({ text: tag + " good job" }),
          weight: 1,
        },
      });
      const plugin2: TresNodeOpsPlugin<
        { text: string },
        { text: string },
        Object
      > = () => ({
        name: "p2",
        filter: {
          tag: (tag: string) => tag === "Ok tag",
        },
        createElement: (tag) => ({ text: tag + " alright job" }),
      });
      const nodeOps = useNodeOpsWithContext({}, [plugin1, plugin2]);

      const noMatchingFilter = nodeOps.createElement("Bad tag", false, "", {
        visible: false,
      });
      expect(noMatchingFilter.text).toBeUndefined();

      const matchesFilter = nodeOps.createElement("Awesome tag", false, "", {
        visible: false,
      });
      expect(matchesFilter.text).equals("Awesome tag good job");

      const alsoMatchesFilter = nodeOps.createElement("Ok tag", false, "", {
        visible: false,
      });
      expect(alsoMatchesFilter.text).equals("Ok tag alright job");
    });
  });

  describe("implementation", () => {
    describe("doAddPlugin", () => {
      it("adds plugins and returns new store", () => {
        const plugin0 = () => ({
          name: "simplePluginA",
        });
        const plugin1 = () => ({
          name: "simplePluginB",
          createElement: () => ({}),
        });
        const context = {};
        const pluginStore0 = {};
        const pluginStore1 = implementation.doAddPlugin(plugin0, pluginStore0, context);
        const pluginStore2 = implementation.doAddPlugin(plugin1, pluginStore1, context);
        expect(pluginStore0["simplePluginA"]).not.toBeDefined();
        expect(pluginStore0["simplePluginB"]).not.toBeDefined();
        expect(pluginStore1["simplePluginA"]).toBeDefined();
        expect(pluginStore1["simplePluginB"]).not.toBeDefined();
        expect(pluginStore2["simplePluginA"]).toBeDefined();
        expect(pluginStore2["simplePluginB"]).toBeDefined();
      });

      it("normalizes and binds context to plugins", () => {
        const onBind = vitest.fn();
        const onCreateElement = vitest.fn()
        const onRemoveElement = vitest.fn()

        const context = {
          onCreateElement,
          onRemoveElement,
        };

        const pluginToAdd = (ctx) => {
          onBind(ctx);
          return {
            name: "simplePlugin",
            weight: -1,
            createElement: {
              fn: (tag: string) => ctx.onCreateElement(tag),
              weight: -111,
            },
            remove: {
              fn: (a:any) => ctx.onRemoveElement(a),
            },
          };
        };

        const pluginStore: TresNodeOpsPluginStore<Object, Object> =
          implementation.doAddPlugin(pluginToAdd, {}, context);
        const boundPlugin = implementation.doGetPluginFromPluginStore(
          "simplePlugin",
          pluginStore
        );

        expect(onBind).toBeCalledWith(context);
        expect(Object.keys(pluginStore)[0]).equals("simplePlugin");
        expect(boundPlugin).not.toBeNull();

        const el = boundPlugin.createElement.fn("myTag");
        boundPlugin.remove.fn(el);

        expect(onCreateElement).toBeCalledWith("myTag");
        expect(onRemoveElement).toBeCalledWith(el);
      });
    });
  });
});