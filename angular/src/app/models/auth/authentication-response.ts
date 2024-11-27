import { CustomerDTO } from '../customer/customer-dto';

export interface AuthenticationResponse {
  token?: string;
  customerDTO: CustomerDTO;
}
