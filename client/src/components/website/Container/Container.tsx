import React, { ReactNode } from "react";
import { StyledContainer } from "./styles";

type Props = {
  className?: string | null;
  children: ReactNode;
};

const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <StyledContainer className={className ?? ""}>
      {children}
    </StyledContainer>
  );
};

export default Container;
