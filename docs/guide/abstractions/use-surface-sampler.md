# useSurfaceSampler <Badge type="warning" text="^3.7.0" />

A hook to obtain the result of the <Sampler /> as a buffer. Useful for driving anything other than InstancedMesh via the Sampler.

<DocsDemo>
  <UseSurfaceSamplerDemo />
</DocsDemo>

## Usage

<<< @/.vitepress/theme/components/UseSurfaceSamplerDemo.vue{4,10,19-29}

## Props

| Props        | Description                                                        |
|--------------|--------------------------------------------------------------------|
| mesh         | **Mesh** Surface mesh from which to sample                         |
| count        | **Number** Number of samples                                       |
| instanceMesh | **InstanceMesh** InstanceMesh to scatter                           |
| weight       | **String** A vertex attribute to be used as a weight when sampling |
| transform    | **Function** A function that can be used as a custom sampling      |