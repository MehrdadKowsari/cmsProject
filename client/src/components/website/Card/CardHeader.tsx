import React, { ReactNode } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import styles from "src/styles/jss/components/card/cardHeaderStyle";

interface props {
  className: string,
  color: "warning"| "success" | "danger" | "info" | "primary",
  plain: boolean,
  children: ReactNode
};
export default function CardHeader(props: props) {
  const { classes } = styles();
  const { className, children, color, plain, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[`${color}CardHeader`]]: color,
    [classes.cardHeaderPlain]: plain,
    [className]: className !== undefined
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}


