import React, { ReactNode } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

type Props = {
  className: string,
  children: ReactNode
};

// core components
import styles from "src/styles/jss/components/card/cardFooterStyle";
export default function CardFooter(props: Props) {
  const { classes } = styles();
  const { className, children, ...rest } = props;
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [className]: className !== undefined
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
}

