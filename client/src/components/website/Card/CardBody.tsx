import React, { ReactNode } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// core components
import styles from "src/styles/jss/components/card/cardBodyStyle";

type Props = {
  className: string,
  children: ReactNode
};

export default function CardBody(props: Props) {
  const { classes } = styles();
  const { className, children, ...rest } = props;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [className]: className !== undefined
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

