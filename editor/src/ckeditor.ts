/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";

import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { CodeBlock } from "@ckeditor/ckeditor5-code-block";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { FontColor, FontSize } from "@ckeditor/ckeditor5-font";
import { Image, ImageUpload } from "@ckeditor/ckeditor5-image";
import { Link } from "@ckeditor/ckeditor5-link";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
  public static override builtinPlugins = [
    Autoformat,
    Bold,
    CodeBlock,
    Essentials,
    FontColor,
    FontSize,
    Image,
    ImageUpload,
    Italic,
    Link,
    Paragraph,
  ];

  public static override defaultConfig = {
    toolbar: {
      items: [
        "fontColor",
        "fontSize",
        "bold",
        "italic",
        "|",
        "imageUpload",
        "link",
        "codeBlock",
        "|",
        "undo",
        "redo",
      ],
    },
    language: "en",
  };
}

export default Editor;