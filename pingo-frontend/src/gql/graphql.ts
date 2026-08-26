/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreateChatInput = {
  isPrivate: boolean;
  name?: string | null | undefined;
  userIds?: Array<string> | null | undefined;
};

export type CreateUserInput = {
  email: string;
  password: string;
};

export type ChatFragmentFragment = { _id: string, userId: string, isPrivate: boolean, userIds: Array<string>, name: string | null };

export type CreateChatMutationVariables = Exact<{
  createChatInput: CreateChatInput;
}>;


export type CreateChatMutation = { createChat: { _id: string, userId: string, isPrivate: boolean, userIds: Array<string>, name: string | null } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { createUser: { _id: string, email: string } };

export type ChatQueryVariables = Exact<{
  _id: string;
}>;


export type ChatQuery = { chat: { _id: string, userId: string, isPrivate: boolean, userIds: Array<string>, name: string | null } };

export type ChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatsQuery = { chats: Array<{ _id: string, userId: string, isPrivate: boolean, userIds: Array<string>, name: string | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { _id: string, email: string } };

export const ChatFragmentFragmentDoc = { "kind": "Document", "definitions": [{ "kind": "FragmentDefinition", "name": { "kind": "Name", "value": "ChatFragment" }, "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "Chat" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isPrivate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userIds" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } as unknown as DocumentNode<ChatFragmentFragment, unknown>;
export const CreateChatDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateChat" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "createChatInput" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateChatInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createChat" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "createChatInput" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "createChatInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isPrivate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userIds" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } }] } as unknown as DocumentNode<CreateChatMutation, CreateChatMutationVariables>;
export const CreateUserDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateUser" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "createUserInput" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateUserInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createUser" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "createUserInput" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "createUserInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "email" } }] } }] } }] } as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const ChatDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Chat" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "chat" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "_id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ChatFragment" } }] } }] } }, { "kind": "FragmentDefinition", "name": { "kind": "Name", "value": "ChatFragment" }, "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "Chat" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isPrivate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userIds" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } as unknown as DocumentNode<ChatQuery, ChatQueryVariables>;
export const ChatsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Chats" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "chats" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ChatFragment" } }] } }] } }, { "kind": "FragmentDefinition", "name": { "kind": "Name", "value": "ChatFragment" }, "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "Chat" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isPrivate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userIds" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } as unknown as DocumentNode<ChatsQuery, ChatsQueryVariables>;
export const MeDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Me" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "me" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "email" } }] } }] } }] } as unknown as DocumentNode<MeQuery, MeQueryVariables>;