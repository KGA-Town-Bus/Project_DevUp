/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import {ClassicEditor} from '@ckeditor/ckeditor5-editor-classic';
import {Autoformat} from '@ckeditor/ckeditor5-autoformat';
import {Bold, Italic} from '@ckeditor/ckeditor5-basic-styles';
import {CloudServices} from '@ckeditor/ckeditor5-cloud-services';
import {CodeBlock} from '@ckeditor/ckeditor5-code-block';
import {EasyImage} from '@ckeditor/ckeditor5-easy-image';
import {Essentials} from '@ckeditor/ckeditor5-essentials';
import {FontColor, FontSize} from '@ckeditor/ckeditor5-font';
import {
  Image,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
} from '@ckeditor/ckeditor5-image';
import {Link} from '@ckeditor/ckeditor5-link';
import {Paragraph} from '@ckeditor/ckeditor5-paragraph';
declare class Editor extends ClassicEditor {
  static builtinPlugins: (
    | typeof Autoformat
    | typeof Bold
    | typeof CloudServices
    | typeof CodeBlock
    | typeof EasyImage
    | typeof Essentials
    | typeof FontColor
    | typeof FontSize
    | typeof Image
    | typeof ImageResize
    | typeof ImageStyle
    | typeof ImageToolbar
    | typeof ImageUpload
    | typeof Italic
    | typeof Link
    | typeof Paragraph
  )[];
  static defaultConfig: {
    toolbar: {
      items: string[];
    };
    language: string;
    image: {
      toolbar: string[];
    };
  };
}
export default Editor;
