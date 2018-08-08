interface PropsConsumer {
    children: Function[],
    store?:Object
}

interface PropsProvider{
    store:Object
}

interface PropsSubscriber extends PropsConsumer{
    select?:String
}

declare module "kubox-preact"{
    export class Consumer{
        render(props:PropsConsumer):Object
    }
    export class Subscriber{
        render(props:PropsSubscriber):Object
    }
    export class Provider{
        render(props:PropsProvider):Object
    }
}