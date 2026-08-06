import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/users/entities/users.entity";

const getCurrentUserByContext = (context: ExecutionContext): User => {
    if (context.getType() == 'http') {
        const request = context.switchToHttp().getRequest();
        return request.user
    }
    else if (context.getType<GqlContextType>() == 'graphql') {
        return GqlExecutionContext.create(context).getContext().req.user
    }
}
export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    return getCurrentUserByContext(context);
})

/*
Get user out of req meta data
*/