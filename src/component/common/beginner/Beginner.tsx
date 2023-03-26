import { getChildrenOrderByProps, isLegalSortArray } from "@/utils";
import React, { Fragment, useMemo, useState } from "react";
import { Step } from "./Step";
import "./style/beginner.css";

interface BeginnerType {
  type: "remove" | "origin";
  children: any;
  render: (
    step: number,
    targetCover: Element & {
      style: Record<string, any>;
    },
    setStep: React.Dispatch<any>,
    onSkip: () => void
  ) => void;
}

// NOTE: 新手导航
function Beginner({
  type = "remove",
  children,
  render,
}: Partial<BeginnerType>) {
  const orderList = useMemo(
    () => getChildrenOrderByProps(children),
    [children]
  );
  const [currentStep, setCurrentStep] = useState(orderList[0]);

  function removeCover(currentStep: number) {
    const cover: Element & {
      style: Record<string, any>;
    } = document.querySelector(`#cover${currentStep}`);
    if (cover) {
      cover.style.display = "none";
      setCurrentStep(currentStep + 1);
    }
  }

  function skip() {
    const cover: Element & {
      style: Record<string, any>;
    } = document.querySelector(`#cover${currentStep}`);
    if (cover) {
      cover.style.display = "none";
      // 设置到最大值
      setCurrentStep(Math.max);
    }
  }

  console.log("render", currentStep);
  // 根据 orderList 的顺序进行渲染
  if (!isLegalSortArray(orderList)) {
    console.warn("order 顺序不合法，各个步骤之间的差值只为1");
    return;
  } else if (currentStep > orderList[orderList.length - 1]) {
    console.warn("已经是最后一步了");
    return type === "remove" ? null : children;
  }

  return React.Children.map(children, (child) => {
    // NOTE: 如果当前的 order 等于当前的步骤，就渲染出来

    // NOTE: 含有 order 属性
    if (child?.props?.order) {
      // NOTE: 当前执行的步骤为当前的 order
      if (child?.props?.order === currentStep) {
        console.log("child", child);
        return (
          <Fragment key={child}>
            {React.cloneElement(child, {
              order: currentStep,
              step: currentStep,
            })}
            {render ? (
              render(
                currentStep,
                document.querySelector(`#cover${currentStep}`),
                setCurrentStep,
                skip
              )
            ) : (
              <>
                <button
                  className="btn"
                  onClick={() => removeCover(currentStep)}
                >
                  下一步
                </button>
                <button className="btn" onClick={() => skip()}>
                  跳过
                </button>
              </>
            )}
          </Fragment>
        );
      } else {
        return type === "remove" ? null : child;
      }
    } else {
      return child;
    }
  });
}

Beginner.Step = Step;

export default Beginner;
