export default function Header({ heading }) {
  return (
    <div class="bg-primary bg-soft">
      <div class="row">
        <div class="col-7">
          <div class="text-primary p-4">
            <h5 class="text-primary">{heading.title}</h5>
            <p>{heading.dec}</p>
          </div>
        </div>
        <div class="col-5 align-self-end">
          <img src="assets/images/profile-img.png" alt="" class="img-fluid" />
        </div>
      </div>
    </div>
  );
}
