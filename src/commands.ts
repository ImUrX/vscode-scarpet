"use strict";
import * as vscode from "vscode";

export function copyClipboard({ document }: vscode.TextEditor) {
    const clipboard = [];
    for(let i = 0; i < document.lineCount; i++) {
        const text = document.lineAt(i).text;

        if(/^\s*\/\//.test(text)) {
            continue;
        }

        if(text.replace(/\/\/.*/, "").startsWith("$")) {
            clipboard.push(text);
        } else {
            clipboard.push("$" + text);
        }
    }
    vscode.env.clipboard.writeText(clipboard.join("\n"));
}