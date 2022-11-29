import React from 'react';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`display: inline-block;`;
const InlineSpinner = ({ color = "#158084", loading, styles }) => <div className={styles}>
  <ClipLoader color={color} loading={loading} size={20} css={override} />
</div>

export default InlineSpinner;