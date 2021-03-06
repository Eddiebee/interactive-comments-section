import React, {
  FunctionComponent,
  useReducer,
  createContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { ReplyContainer } from "./styles";
import { data } from "./data";
import { Reply } from "./Reply";
import { CommentBox } from "./CommentBox";
import { nanoid } from "nanoid";
import { Comment, TUser } from "./Comment";
import { CommentAction, CommentState, commentReducer } from "./utils/reducer";

const currentUser = data.currentUser;
const comments = data.comments;

const initialState = { value: comments };

// type definition for ReducerContext
type TReducerContext = {
  state: CommentState;
  dispatch: ({ type, payload }: CommentAction) => void;
  currentUser: TUser;
  showEdit: boolean;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
};

// // create context for Reducer
export const ReducerContext = createContext({} as TReducerContext);

export const InteractiveCommentSection: FunctionComponent = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [state, dispatch] = useReducer(commentReducer, initialState);

  return (
    <ReducerContext.Provider
      value={{ state, dispatch, currentUser, showEdit, setShowEdit }}
    >
      {state.value.map((comment) => {
        return (
          <React.Fragment key={nanoid()}>
            <div>
              <Comment comment={comment} dispatch={dispatch} />
            </div>
            {comment.replies.length > 0 && (
              <ReplyContainer>
                {comment.replies.map((reply: any) => {
                  return (
                    <Reply
                      key={nanoid()}
                      reply={reply}
                      comment={comment}
                      isCurrentUser={
                        currentUser.username === reply.user.username
                      }
                    />
                  );
                })}
              </ReplyContainer>
            )}
          </React.Fragment>
        );
      })}
      <CommentBox action="comment" />
    </ReducerContext.Provider>
  );
};
