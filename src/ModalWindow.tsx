import { makeStyles } from "@material-ui/core";
import { FunctionComponent } from "react";
import { useForm, Controller} from "react-hook-form";
import { TodoItem, useTodoItems } from "./TodoItemsContext";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CSSProperties } from "@material-ui/styles";

interface ModalWindowProps {
  item: TodoItem
  callback:any
}

const useInputStyles = makeStyles(() => ({
  root: {
      marginBottom: 24,
  },
}));

const MWSyleDiv:CSSProperties = {
  position:'fixed',
  top:0,
  left:0,
  minWidth:'100vw',
  minHeight: '100vh',
  zIndex:1,
  backgroundColor:'black',
  opacity:'.5'
};
const MWSyleForm:CSSProperties = {
  position:'absolute',
  top:'40%',
  left:'40vw',
  zIndex:2,
  backgroundColor:'white',
  padding:10,
  borderRadius:5,
};

const ModalWindow: FunctionComponent<ModalWindowProps> = ({ item, callback }) => {
  const classes = useInputStyles();
  const { control, handleSubmit, reset, watch } = useForm();
  const { dispatch } = useTodoItems();

  return (
    <>
    <div 
      style={MWSyleDiv}
      onClick={()=>callback(false)}
      >

      </div>
    <form
    style={MWSyleForm}
      onSubmit={handleSubmit((formData: { title: string, details: string }) => {
        dispatch({ type: 'edit', data: { ...item,title: formData.title, details: formData.details } });
        reset({ title: '', details: '' });
        callback(false);
      })}
    >
      <Controller
        name="title"
        control={control}
        defaultValue={item.title}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            label="TODO"
            fullWidth={true}
            className={classes.root}
          />
        )}
      />
      <Controller
        name="details"
        control={control}
        defaultValue={item.details}
        render={({ field }) => (
          <TextField
            {...field}
            label="Details"
            fullWidth={true}
            multiline={true}
            className={classes.root}
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!watch('title')}
      >
        Change
      </Button>
    </form>
    </>
    
  );
};

export default ModalWindow;