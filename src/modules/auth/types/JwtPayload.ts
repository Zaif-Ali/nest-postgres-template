import { UserRole } from 'src/types/user.types';

type JwtPayload = {
  sub: string;
  userId: string;
  role: UserRole;
};
export default JwtPayload;
