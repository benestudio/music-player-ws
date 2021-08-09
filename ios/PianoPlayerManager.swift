import Foundation

@objc(PianoPlayerManager)
class PianoPlayerManager : RCTEventEmitter, PianoPlayerDelegate {
  lazy var player: PianoPlayer = PianoPlayer().setDelegate(delegate: self)
  var handleStop: (() -> Void)?
  
  @objc(play:tempo:resolve:reject:)
  func play(_ notes: NSArray, tempo: NSNumber, resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    guard let beats = notes as? [[Int]] else {
      return;
    }

    handleStop = { [weak self] in
      resolve(nil)
      self?.handleStop = nil
    }

    player.play(beats: beats, tempo: Int(truncating: tempo))
  }
  
  @objc(stop)
  func stop() {
    player.stop()
  }
  
  override func supportedEvents() -> [String]! {
    return ["noteChange"]
  }
  
  func sendOnNoteChangeEvent(num: Int) {
    sendEvent(withName: "noteChange", body: ["num": num])
  }
  
  func onNoteChange(num: Int) {
    sendOnNoteChangeEvent(num: num)
  }
  
  func onStop() {
    handleStop?()
  }
}
