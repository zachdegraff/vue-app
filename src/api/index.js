import * as auth from './methods/auth'
import * as feed from './methods/feed'
import * as cards from './methods/cards'
import * as teams from './methods/teams'
import * as users from './methods/users'
import * as files from './methods/files'
import * as members from './methods/members'
import * as questions from './methods/questions'
import * as tags from './methods/tags'


const api = {
    auth,
    feed,
    tags,
    cards,
    teams,
    users,
    files,
    members,
    questions,
};

export default api