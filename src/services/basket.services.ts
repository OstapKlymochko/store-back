import {ApiError} from "../error";
import {Basket} from '../models';

class BasketServices {
    async createBasket() {
        try {
            const {id} = await Basket.create({
                devices: []
            });
            return id;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const basketServices = new BasketServices();