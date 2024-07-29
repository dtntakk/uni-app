// TODO 临时拷贝 uni-app/api/uni-canvas
import type { UniCanvasElement } from '@dcloudio/uni-app-x/types/native'

import type {
  CanvasContext,
  CanvasContextToBlobCallback,
  CreateCanvasContextAsyncOptions,
} from '@dcloudio/uni-app-x/types/uni'

class CanvasContextImpl implements CanvasContext {
  _element: UniCanvasElement

  constructor(element: UniCanvasElement) {
    this._element = element
  }

  getContext(type: string): CanvasRenderingContext2D | null {
    // TODO 待语法库更新后移除
    // @ts-expect-error
    return this._element.getContext(type)
  }

  toBlob(callback: CanvasContextToBlobCallback)
  toBlob(callback: CanvasContextToBlobCallback, type: string)
  toBlob(
    callback: CanvasContextToBlobCallback,
    type?: string,
    quality?: number
  ) {
    // TODO 待语法库更新后移除
    // @ts-expect-error
    this._element.toBlob(callback, type, quality)
  }

  toDataUrl(): string
  toDataUrl(type?: string, encoderOptions?: string): string {
    // TODO 待语法库更新后移除
    // @ts-expect-error
    return this._element.toDataUrl(type, encoderOptions)
  }
}

export const createCanvasContextAsync = function (
  options: CreateCanvasContextAsyncOptions
) {
  // @ts-expect-error
  const currentPage: ComponentPublicInstance =
    options.component ?? getCurrentPages()[getCurrentPages().length - 1]
  if (currentPage != null) {
    const element = currentPage.$el?.querySelector('#' + options.id)
    if (element != null) {
      const canvas = element as UniCanvasElement
      options.success?.(new CanvasContextImpl(canvas))
    } else {
      const uniError = new UniError(
        'uni-createCanvasContextAsync',
        -1,
        'canvas id invalid.'
      )
      options.fail?.(uniError)
    }
  } else {
    const uniError = new UniError(
      'uni-createCanvasContextAsync',
      -1,
      'No found current page.'
    )
    options.fail?.(uniError)
  }
  options.complete?.()
}