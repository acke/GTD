//
//  Appcelerator Titanium Mobile
//  WARNING: this is a generated file and should not be modified
//

#import <UIKit/UIKit.h>
#define _QUOTEME(x) #x
#define STRING(x) _QUOTEME(x)

NSString * const TI_APPLICATION_DEPLOYTYPE = @"test";
NSString * const TI_APPLICATION_ID = @"se.purplescout.knut.GTD";
NSString * const TI_APPLICATION_PUBLISHER = @"Knut Funkel";
NSString * const TI_APPLICATION_URL = @"www.purplescout.se";
NSString * const TI_APPLICATION_NAME = @"GTD";
NSString * const TI_APPLICATION_VERSION = @"0.0.4";
NSString * const TI_APPLICATION_DESCRIPTION = @"No description provided";
NSString * const TI_APPLICATION_COPYRIGHT = @"2011 by Knut Funkel";
NSString * const TI_APPLICATION_GUID = @"bf4ca09e-2ba4-4b44-bf80-b46203693015";
BOOL const TI_APPLICATION_ANALYTICS = true;

#ifdef TARGET_IPHONE_SIMULATOR
NSString * const TI_APPLICATION_RESOURCE_DIR = @"";
#endif

int main(int argc, char *argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

#ifdef __LOG__ID__
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	NSString *logPath = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithFormat:@"%s.log",STRING(__LOG__ID__)]];
	freopen([logPath cStringUsingEncoding:NSUTF8StringEncoding],"w+",stderr);
	fprintf(stderr,"[INFO] Application started\n");
#endif

	int retVal = UIApplicationMain(argc, argv, nil, @"TiApp");
    [pool release];
    return retVal;
}
