import { SetMetadata } from "@nestjs/common";


export const IS_PUBLIC_KEY = "IS_PUBLIC";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

//setMetaata is method that allow to make api public when we use global guard iy=t make all guard private and that why we need to some api public so it use