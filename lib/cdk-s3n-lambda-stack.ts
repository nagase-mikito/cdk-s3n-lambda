import { Construct } from 'constructs';
import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Bucket, EventType } from 'aws-cdk-lib/aws-s3';
import { LambdaDestination } from 'aws-cdk-lib/aws-s3-notifications';
import { Runtime, Function, AssetCode } from 'aws-cdk-lib/aws-lambda';

export class CdkS3NLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Lambda Function
    const target_function = new Function(this, "sumpleFunc", {
      code: new AssetCode("resources"),
      handler: "index.handler",
      runtime: Runtime.NODEJS_16_X,
      functionName: "sumple_function",
      timeout: Duration.seconds(60)
    });
  
    // 既存のS3バケットを取得
    const existing_bucket = Bucket.fromBucketArn(
      this,
      'sumple-bucket-20220630-becominn',
      'arn:aws:s3:::sumple-bucket-20220630-becominn'
    )

    // S3Notificationを設定
    existing_bucket.addEventNotification(
      EventType.OBJECT_CREATED_POST,
      new LambdaDestination(target_function)
    )
  
  }
}
