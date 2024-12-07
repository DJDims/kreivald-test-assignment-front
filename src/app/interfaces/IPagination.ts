import { ILinks } from "./ILinks";
import { IUser } from "./IUser";

export interface IPagination {
    success: boolean;
    page: number;
    total_pages: number;
    total_users: number;
    count: number;
    links: ILinks;
    users: IUser[];
}
