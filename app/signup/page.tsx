import { Input } from '@/components/common/ui/input';
import { Button } from '@/components/common/ui/button';

export default function Signup() {
    return (
        <div>
            <Input label="name" id="name" name="name" />
            <Button>Submit</Button>
        </div>
    );
}
