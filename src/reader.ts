"use strict";
import * as vscode from "vscode";
import Tokenizr from "tokenizr";
const ASTY = require("asty-astq");

export class Reader {
    private asty = new ASTY();
    private lexer = new Tokenizr();

    constructor() {
        
    }
}