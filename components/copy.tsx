"use client";

import React from 'react'

const Copy = ({ message }: { message: string; }) => {
  const clickHandler = async () => {
    // const message = 'クリップボードに保存するメッセージ'
    try {
      await navigator.clipboard.writeText(message)
      alert('クリップボードに保存しました。')
    } catch {
      alert('失敗しました。')
    }
  }

  return (
    <button className='btn m-5' onClick={() => clickHandler()}>
      COPY
    </button>
  )
}

export default Copy;
