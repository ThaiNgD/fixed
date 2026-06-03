import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import CartItem from "./CartItem";

const CheckoutCartDialog = () => {
  return (
    <>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
          <DialogDescription>
            Make changes to your cart here. Click "Checkout" when you are done.
            You have 3 items in your cart.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <CartItem />
          <CartItem />
          <CartItem />
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Keep Shopping</Button>
          </DialogClose>
          <Button type="submit">Checkout</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default CheckoutCartDialog;
