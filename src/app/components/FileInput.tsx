import React, { ReactElement, useCallback, useRef, memo, useImperativeHandle, ChangeEventHandler, ForwardRefRenderFunction } from 'react'

// https://github.com/facebook/react/issues/3468#issuecomment-1031366038
// react types 定义中没有 directory 和 webkitdirectory 所以自己定义。
declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: boolean;
    webkitdirectory?: boolean;
  }
}

const inputStyle = { display: 'none' }

type FileInputProps = {
  accept?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  multiple?: boolean;
  directory?: boolean 
  webkitdirectory?: boolean;
};

interface IPropsSystemFolderSelect {
  value?: string;
  onChange?: (value: string) => void;
}

interface IRefFileInput {}
 

const FileInput: ForwardRefRenderFunction<IRefFileInput, FileInputProps> = (props, ref) => {
  const {
    accept,
    onChange,
    multiple,
    directory,
    webkitdirectory
  } = props

  const inputRef = useRef<HTMLInputElement>()
  const locked = useRef(false)

  const click = () => {
    if (locked.current) return
    locked.current = true

    inputRef.current.value = ''
    inputRef.current.click()


    setTimeout(() => {
      locked.current = false
    }, 1000)
  };

  useImperativeHandle(ref, () => ({ click }))

  const input = document.createElement('input') as any

  return (
    <input
      ref={inputRef}
      accept={accept}
      multiple={multiple}
      onChange={onChange}
      style={inputStyle}
      // for chrome
      webkitdirectory={webkitdirectory}
      directory={directory}

      type="file"
    />
  )
}

export default memo(React.forwardRef(FileInput));
