package com.musicplayer;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class PianoPlayerModule extends ReactContextBaseJavaModule implements PianoPlayer.PlayerListener {
    private final PianoPlayer player;
    private Promise playPromise;

    public PianoPlayerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        player = new PianoPlayer(reactContext);
        player.setPlayerListener(this);
    }

    @Override
    @NonNull
    public String getName() {
        return "PianoPlayerModule";
    }

    // TODO: 3B: write method to play on player
    // the extra last argument is the promise, set it
    // check type conversation: https://reactnative.dev/docs/native-modules-android#argument-types
    // function comes here

    // TODO 3C: write stop method
    // function comes here

    @Override
    public void onStop() {
        if (playPromise != null) {
            playPromise.resolve(null);
            playPromise = null;
        }
    }

    @Override
    public void onBeatChange(int beatIndex) {
        sendOnNoteChangeEvent(beatIndex);
    }

    private void sendOnNoteChangeEvent(int beat) {
        WritableMap params = Arguments.createMap();
        params.putInt("num", beat);
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("noteChange", params);
    }
}
