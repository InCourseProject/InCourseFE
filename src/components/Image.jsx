import React from 'react'

const Image = () => {
    return (
        <div><input
            type="file"
            name="imageUrl"
            className="imginput"
            accept="image/*" // accept속성은 서버로 업로드할 수 있는 파일의 타입을 명시, input type="file" 에서만 사용가능
            // onChange={showFileImage}
            onChange={onChangeImg}
        /></div>
    )
}

export default Image