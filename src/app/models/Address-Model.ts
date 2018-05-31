import { Observable } from 'rxjs/Observable';
import { AngularFirestoreDocument } from 'angularfire2/firestore/document/document';
import { Category } from './category';
import * as firebase from 'firebase';

export interface AddressModel {
  key: string;
  address: any [];
  uid: string;
}
