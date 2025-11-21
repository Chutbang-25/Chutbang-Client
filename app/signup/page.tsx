import { Input } from '@/components/common/ui/Input';
import { Button } from '@/components/common/ui/Button';

export default function Signup() {
    return (
        <div>
            <Input label="name" id="name" name="name" />
            <Button>Submit</Button>
        </div>
    );
}
