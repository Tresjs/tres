# Backdrop

<ClientOnly>
  <div class="demo-scene">
     <Suspense>
        <BackdropDemo class="demo-scene" />
    </Suspense>
  </div> 
</ClientOnly>

The `cientos` package provides a `<Backdrop />` component. It's just a curved plane, like a studio backdrop. Meant is for presentational purposes, to break up light and shadows more interestingly.

## Usage

```html
<Backdrop />

// Backdrop with a custom material
<Backdrop  
  :floor="1.5" 
  :segments="20" 
  recieve-shadow>
    <TresMeshPhysicalMaterial color="orange" :roughness="1" />
</Backdrop>
```
