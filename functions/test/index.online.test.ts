import * as functions from 'firebase-functions-test';
import { db, makeDetailedData } from '../src/index';
import 'jest';

// import * as admin from 'firebase-admin';
const projectId = 'maet-pickup-dev';

// Setup for offline
// process.env.GCLOUD_PROJECT = projectId;
// process.env.FIRESTORE_EMULATOR_HOST = process.env.localHost;
// End Setup for offline

// admin.initializeApp({ projectId });

// const db = admin.firestore();

// const testENV = functions(
//     {
//         projectId: projectId,
//     },
//     './serviceAccountKey.json',
// );

const testEnv = functions({ projectId: projectId }, './service-account.json');

// declare tests 
describe("Firebase functions testing", () => {
    let wrapped;
    beforeAll(() => {
        wrapped = testEnv.wrap(makeDetailedData);
    });
});

/*
// let wrapped: any;
describe('working tests', () => {
    let privateRefID: string;
    beforeAll(() => {
        // let wrapped = testEnv.wrap(makeDetailedData);
        // wrapped = testENV.wrap(myFunction.makeDetailedData);
    });

    // afterEach(() => {
    //     db.collection('private-user-data').doc(privateRefID).delete();
    //     db.collection('public-user-data').doc(privateRefID).delete();
    // });

    test('Add new collection doc', async () => {
        // const path = 'public-user-data/';
        const inputToDB = {
            name: 'seth',
            count: '7',
            image: 'dasadsadaawd',
            email: 'seth@email',
            emailVerified: true,
            phone: 1234566,
        };

        const expectedValue = {
            name: inputToDB.name,
            count: inputToDB.count,
            image: inputToDB.image,
        };

        console.log(expectedValue);
        

        // const snap = await testENV.firestore.makeDocumentSnapshot(inputToDB, 'private-user-data');

        // const snap = db.collection('private-user-data').doc().set(inputToDB);

        const privateRef = db.collection('private-user-data').doc();
        await privateRef.set(inputToDB);


        // await wrapped(snap);

        privateRefID = privateRef.id;

        console.log(privateRefID);

        // await privateRef.set(inputToDB);

        // console.log('snap', snap);

        const publicRef = db.collection('public-user-data').doc(privateRefID);

        // console.log(publicRef);
        await new Promise((r) => setTimeout(r, 5000));

        const publicDoc = await publicRef.get();

        console.log(publicDoc.data());

        expect(publicDoc.data()).toEqual(expectedValue);
    }, 8000);

    test('Sample ', () => {
        expect(1).toBe(1);
    });
});

*/
