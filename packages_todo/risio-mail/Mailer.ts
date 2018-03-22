import { Mail } from './Mail'

export interface Mailer {

    send(mail: Mail): Promise<boolean>

}
