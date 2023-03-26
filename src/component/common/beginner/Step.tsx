import React, { useRef } from "react";
import { HighLight } from "./HighLight";

interface StepType {
  order: number;
  children: any;
  step: number;
}
// NOTE: 新手导航步骤
export function Step({ order, children, step }: Partial<StepType>) {
  const cover = useRef(null);
  // 根据order来渲染
  return (
    <>
      {/* 需要对这个children进行高亮处理 */}
      {/* 遮罩层 */}
      {step === order && (
        <div className="cover" id={"cover" + order} ref={cover}></div>
      )}
      <HighLight cover={cover}>
        <div>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              key: child,
              order,
            });
          })}
        </div>
      </HighLight>
    </>
  );
}
