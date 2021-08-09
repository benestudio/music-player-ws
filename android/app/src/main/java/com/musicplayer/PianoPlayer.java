package com.musicplayer;

import android.content.Context;
import android.media.AudioAttributes;
import android.media.SoundPool;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.ReadableArray;

import java.util.HashMap;

public class PianoPlayer {
    private final Handler handler = new Handler(Looper.getMainLooper());
    private final HashMap<String, Integer> soundIds = new HashMap<>();
    private SoundPool soundPool;
    private HashMap<Integer, Integer> streamIds = new HashMap<>();
    private PlayerListener playerListener;

    public PianoPlayer(Context context) {
        initializeSoundPool();
        loadSounds(context);
    }

    public void play(ReadableArray beats, double tempo) {
        stop();
        streamIds = new HashMap<>();
        double noteDuration = 60.0f / tempo * 1000;
        for (int i = 0; i < beats.size(); i++) {
            ReadableArray notes = beats.getArray(i);
            double delay = i * noteDuration;
            int streamId = i;
            handler.postDelayed(() -> playSound(notes, streamId), (long) delay);
            handler.postDelayed(() -> stopSound(notes, streamId), (long) (delay + noteDuration + 100));
        }
        double endTime = noteDuration * beats.size();
        handler.postDelayed(() -> {
            if (playerListener != null) {
                playerListener.onStop();
            }
        }, (long) endTime);
    }

    public void stop() {
        handler.removeCallbacksAndMessages(null);
        if (soundPool != null) {
            for (Integer streamId : streamIds.values()) {
                soundPool.stop(streamId);
            }
        }
        streamIds.clear();
    }

    public void setPlayerListener(PlayerListener playerListener) {
        this.playerListener = playerListener;
    }

    private void initializeSoundPool() {
        AudioAttributes audioAttributes = new AudioAttributes.Builder()
                .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                .build();

        soundPool = new SoundPool.Builder()
                .setMaxStreams(15)
                .setAudioAttributes(audioAttributes)
                .build();
    }

    private void loadSounds(Context context) {
        for (int i = 0; i <= 14; i++) {
            String identifier = "piano" + i;
            int sound = context.getResources()
                    .getIdentifier(identifier, "raw", context.getPackageName());
            soundIds.put(identifier, soundPool.load(context, sound, 1));
        }
    }

    private void playSound(ReadableArray pianoNotes, int streamId) {
        if (playerListener != null) {
            playerListener.onBeatChange(streamId);
        }
        for (int i = 0; i < pianoNotes.size(); i++) {
            int pianoNote = pianoNotes.getInt(i);
            int soundId = soundIds.get("piano" + pianoNote);
            int stream = soundPool.play(soundId, 1.0f, 1.0f, 1, 0, 1.0f);
            streamIds.put(streamId + i * 10000, stream);
        }
    }

    private void stopSound(ReadableArray pianoNotes, int streamId) {
        for (int i = 0; i < pianoNotes.size(); i++) {
            soundPool.stop(streamIds.get(streamId + i * 10000));
            streamIds.remove(streamId + i * 10000);
        }
    }

    public interface PlayerListener {
        void onBeatChange(int beatIndex);
        void onStop();
    }
}
