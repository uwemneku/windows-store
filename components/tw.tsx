import React, { ComponentProps, JSXElementConstructor } from "react";
import { twMerge } from "tailwind-merge";
/**A callback function which returns a string of tailwind classes
 * based on the props of a component
 */
type baseClassFunction<K> = (props: K) => string;

// /**
//  *
//  * @param baseClassName
//  * @param type The type of Html element to create. Default value of div
//  * @returns
//  */
function tw<
  T extends object & { as?: keyof JSX.IntrinsicElements },
  K extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = "div"
>(baseClassName: string | baseClassFunction<T>, type: K = "div" as K) {
  return React.forwardRef(function Styled(
    { className, children, as, ...props }: ComponentProps<K> & T,
    ref
  ) {
    const objKeys = Object.keys(props);
    const styledProps: { [key: string]: unknown } = {};
    objKeys.forEach((key) => {
      if (key.startsWith("$")) {
        styledProps[key] = props[key];
        delete props[key];
      }
    });
    const componentBaseClass =
      typeof baseClassName === "string"
        ? baseClassName
        : typeof baseClassName === "function"
        ? baseClassName(styledProps as T)
        : "";
    const componentClass = twMerge(componentBaseClass, className);
    return React.createElement(
      as || type,
      { className: componentClass, ...props, ref },
      children
    );
  });
}

export default tw;
