import * as React from "react";
import { Novel } from "../types/novel";

import "../styles/test.css";

export interface NovelListProps {
  novels: Novel[];
}

const NovelList: React.SFC<NovelListProps> = props => {
  return (
    <ul>
      {props.novels &&
        props.novels.map((novel, index) => {
          return (
            <li key={novel.id}>
              <span>{index}</span>
              <span>{novel.title}</span>
              <span>{novel.author}</span>
              <span>{novel.summary}</span>
            </li>
          );
        })}
    </ul>
  );
};

export default NovelList;
