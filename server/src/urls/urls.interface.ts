import express from "express";

export interface RequestWithUrl extends express.Request {
    url: string;
}