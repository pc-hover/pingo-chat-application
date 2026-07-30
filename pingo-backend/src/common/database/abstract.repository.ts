import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractEntity } from "./abstract.entity";
import { Model, Types, QueryFilter, UpdateQuery } from "mongoose";
export abstract class AbstractRepository<TDocument extends AbstractEntity> {
    //base class new logger 
    protected abstract readonly logger: Logger
    constructor(protected readonly model: Model<TDocument>) { }


    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {

        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),

        });
        //till here document is created for passed model in memory not in DB
        return (await createdDocument.save()).toJSON() as unknown as TDocument
    }
    async findOne(filterQuery: QueryFilter<TDocument>): Promise<TDocument> {

        const document = await this.model.findOne(filterQuery).lean<TDocument>()
        if (!document) {
            this.logger.warn("Document not found in database", filterQuery)
            throw new NotFoundException("Data Not found in Database")
        }
        return document
    }
    //find 
    async find(filterQuery: QueryFilter<TDocument>): Promise<TDocument[]> {
        return this.model.find(filterQuery).lean<TDocument[]>();

    }
    //findandupdate
    async findAndUpdate(filterQuery: QueryFilter<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOneAndUpdate(filterQuery, update, {
            new: true
        })
        if (!document) {
            this.logger.warn("Document not found in database")
            throw new NotFoundException("Data Not found in Database")
        }
        return document

    }
    //findand Delete
    async findAndDelete(filterQuery: QueryFilter<TDocument>): Promise<TDocument> {
        return this.model.findOneAndDelete(filterQuery).lean<TDocument>();
    }
}