import { day } from '../../features/Day/locale';
import { ke } from '../../features/Ke/locale';
import { kho } from '../../features/Kho/locale';
import {auth} from '../../features/auth/locale/index';
import user from '../../features/user/locale/index';
import {module} from '../../features/module/locale/index';
import { operation } from '../../features/operation/locale';
import { role } from '../../features/role/locale';
import { app as appVi } from '../../common/locale/vi/app.vi';
import { app as appEn } from '../../common/locale/en/app.en';

const messages={
    vi:{
        app: appVi,
        user:user.vi,
        auth:auth.vi,
        day:day.vi,
        ke:ke.vi,
        kho:kho.vi,
        module:module.vi,
        operation:operation.vi,
        role:role.vi
    },
    en:{
        app: appEn,
        user:user.en,
        auth:auth.en,
        day:day.en,
        ke:ke.en,
        kho:kho.en,
        module:module.en,
        operation:operation.en,
        role:role.en
    },
}
export default messages;
