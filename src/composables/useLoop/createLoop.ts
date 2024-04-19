import { createPriorityEventHook } from "../../utils/createPriorityEventHook";

interface BindUseLoopProp<T> {
  args: T;
  defaultRender?: (eventParam: T) => void;
  onBeforeLoop?: (eventParam: T) => void;
  onAfterLoop?: (eventParam: T) => void;
}

export function createLoop<T>(props: BindUseLoopProp<T>) {
  type Event = (eventParam: T) => void;

  const hook = createPriorityEventHook<T>();
  const defaultRender: Event = props.defaultRender ?? (() => {});
  const onBeforeLoop: Event = props.onBeforeLoop ?? (() => {});
  const onAfterLoop: Event = props.onAfterLoop ?? (() => {});
  const args = props.args;

  // NOTE: v3 API
  // TODO: Deprecate and eventually remove
  const afterLoopEventHook = createPriorityEventHook<T>();
  // NOTE: End v3 API

  const trigger = () => {
    onBeforeLoop(args);
    hook.trigger(args);
    if (hook.countPositive <= 0) {
      // NOTE: Assume that if user wants to take over rendering, 
      // they will have inserted a positive priority fn in hook.
      // If that's the case, don't call the default render.
      defaultRender(args);
    }
    afterLoopEventHook.trigger(args);
    onAfterLoop(args);
  };

  const dispose = () => {
    hook.dispose();
    afterLoopEventHook.dispose();
  };

  return { trigger, on: hook.on, onAfter: afterLoopEventHook.on, dispose };
}
