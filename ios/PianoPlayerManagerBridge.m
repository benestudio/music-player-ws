#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(PianoPlayerModule, PianoPlayerManager, NSObject)

RCT_EXTERN_METHOD(play:(NSArray *)notes tempo:(nonnull NSNumber *)tempo resolve:(RCTPromiseResolveBlock *)resolve reject:(RCTPromiseRejectBlock *)reject);
RCT_EXTERN_METHOD(stop);

@end
