import * as vscode from "vscode";

export type Argument = {
    name: string;
    description: string | vscode.MarkdownString;
}

export class ScarpetItem {
    public label: string;
    public kind: vscode.CompletionItemKind;
    public description?: string | vscode.MarkdownString;
    public arguments: Argument[] = [];
    public returns?: string;

    constructor(label: string, kind: vscode.CompletionItemKind) {
        this.label = label;
        this.kind = kind;
    }

    public generateCompletionItem(): vscode.CompletionItem {
        const item = new vscode.CompletionItem(this.label, this.kind);
        if(this.description) {
            item.documentation = this.description;
        }
        return item;
    }
}