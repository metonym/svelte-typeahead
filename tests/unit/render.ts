import {
  type Component,
  type ComponentProps,
  flushSync,
  mount,
  unmount,
} from "svelte";

/** Mounts a component into a detached container and returns a matching cleanup function. */
export function render<TComponent extends Component<any>>(
  ComponentToRender: TComponent,
  props: ComponentProps<TComponent>,
) {
  const target = document.createElement("div");
  document.body.appendChild(target);
  // `mount`'s options type is conditional on whether Props allows no props,
  // which TS can't resolve through a generic — cast to sidestep it.
  const instance = flushSync(() =>
    mount(ComponentToRender, { target, props } as never),
  );

  return {
    target,
    instance,
    cleanup: () => {
      unmount(instance);
      target.remove();
    },
  };
}
