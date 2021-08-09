import Foundation
import AVFoundation

class PianoPlayer {
  var timers: [Timer] = []
  var sounds: [String: AVAudioPlayer] = [:]
  var pianoPlayerDelegate: PianoPlayerDelegate?
  
  init() {
    loadSounds()
  }
  
  func loadSounds() {
    do {
      for index in 0...14 {
        let key = "piano\(index)"
        let path = Bundle.main.path(forResource: "\(key).mp3", ofType:nil)!
        let url = URL(fileURLWithPath: path)
        let player = try AVAudioPlayer(contentsOf: url)
        sounds[key] = player
      }
    } catch {
      // no-op
    }
  }
  
  func play(beats: [[Int]], tempo: Int) {
    stop();
    let noteDuration: Double = 60.0 / Double(tempo)
    for (index, notes) in beats.enumerated() {
      scheduleNotes(notes: notes, noteDuration: noteDuration, beat: index)
    }
    DispatchQueue.main.async { [weak self] in
      let endTime = noteDuration * Double(beats.count)
      let endTimer = Timer.scheduledTimer(withTimeInterval: endTime, repeats: false) { [weak self] _ in
        self?.pianoPlayerDelegate?.onStop()
      }
      self?.timers.append(endTimer)
    }
  }
  
  func stop() {
    timers.forEach { timer in
      timer.invalidate()
    }
    timers.removeAll()
    sounds.values.forEach { player in
      player.stop()
    }
  }
  
  func scheduleNotes(notes: [Int], noteDuration: Double, beat: Int) {
    let startTime = Double(beat) * noteDuration
    let endTime = startTime + noteDuration + 0.1
    DispatchQueue.main.async { [weak self] in
      let startTimer = Timer.scheduledTimer(withTimeInterval: startTime, repeats: false) { [weak self] _ in
        self?.playNotes(notes: notes, beat: beat)
      }
      let endTimer = Timer.scheduledTimer(withTimeInterval: endTime, repeats: false) { [weak self] _ in
        self?.stopNotes(notes: notes)
      }
      self?.timers.append(startTimer)
      self?.timers.append(endTimer)
    }
  }
  
  func playNotes(notes: [Int], beat: Int) {
    pianoPlayerDelegate?.onNoteChange(num: beat)
    for note in notes {
      let key = "piano\(note)"
      guard let sound = self.sounds[key] else {
        continue;
      }
      sound.stop()
      self.sounds[key] = try! AVAudioPlayer(contentsOf: sound.url!)
      self.sounds[key]!.play()
    }
  }
  
  func stopNotes(notes: [Int]) {
    for note in notes {
      let key = "piano\(note)"
      guard let sound = self.sounds[key] else {
        continue;
      }
      sound.stop()
    }
  }
  
  func setDelegate(delegate: PianoPlayerDelegate?) -> PianoPlayer {
    pianoPlayerDelegate = delegate
    return self
  }
}

public protocol PianoPlayerDelegate {
  func onNoteChange(num: Int)
  func onStop()
}
