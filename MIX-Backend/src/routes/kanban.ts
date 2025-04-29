import express from 'express';
import KanbanHTTPHandler from '@/handlers/kanban';
import { jwtCheckFromCookie, tryRefreshTokenMiddleware } from '@/middleware/auth0';

const router = express.Router();
const kanbanHandler = new KanbanHTTPHandler();

router.use(jwtCheckFromCookie, tryRefreshTokenMiddleware);

router.get('/', kanbanHandler.getData);
router.put('/id/:id', kanbanHandler.updatePhaseSale)

export default router;