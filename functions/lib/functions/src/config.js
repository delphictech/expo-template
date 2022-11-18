"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = require("firebase-admin/app");
const firebase_admin_1 = require("firebase-admin");
// initialize firebase app
(0, app_1.initializeApp)();
/**
 * Declare database instance
 */
exports.db = (0, firebase_admin_1.firestore)();
//# sourceMappingURL=config.js.map