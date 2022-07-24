import * as auth from './methods/auth'
import * as feed from './methods/feed'
import * as cards from './methods/cards'
import * as teams from './methods/teams'
import * as users from './methods/users'
import * as files from './methods/files'
import * as members from './methods/members'
import * as questions from './methods/questions'
import * as contentpacks from './methods/contentpacks'
import * as comments from './methods/comments'
import * as tags from './methods/tags'
import * as plans from './methods/plans'
import * as coupons from './methods/coupons'
import * as subscription from './methods/subscription'
import * as publicSites from './methods/publicSites'


const api = {
    auth,
    feed,
    tags,
    plans,
    cards,
    teams,
    users,
    files,
    members,
    questions,
    contentpacks,
    comments,
    coupons,
    subscription,
    publicSites,
};

export default api
