import { CategoryType } from "@/store/informationStore";
import { Modal } from "../Modal/Modal";
import MainCategoryModal from "../Modal/information/MainCategoryModal";
import SubCategoryModal from "../Modal/information/SubCategoryModal";

interface ICategory {
  categories: CategoryType[];
  activeMainCategory: CategoryType | null;
  setActiveMainCategoryHandler: (mainCategory: CategoryType) => void;
  modalProps: {
    isMainModal: boolean;
    setIsOpenMainModalHandler: (_props: boolean) => void;
    isSubModal: boolean;
    setIsOpenSubModalHandler: (_props: boolean) => void;
  };
}

const Category = ({
  categories,
  activeMainCategory,
  setActiveMainCategoryHandler,
  modalProps,
}: ICategory) => {

  return (
    <div className="flex w-full flex-col gap-[2rem]">
      <section className="flex flex-col">
        <article className="mb-[2rem] flex gap-[1rem]">
          <h2 className="text-3xl font-bold"> 메인 카테고리 </h2>
          <div className="flex items-center justify-center">
            <button
              onClick={() => modalProps.setIsOpenMainModalHandler(true)}
              className="btn btn-outline btn-sm aspect-square w-[2rem] hover:bg-primary"
            >
              +
            </button>
          </div>
        </article>
        <div className="flex flex-wrap gap-[1rem]">
          {categories?.map((i) => (
            <button
              key={i.id}
              onClick={() => setActiveMainCategoryHandler(i)}
              className={`btn btn-outline ${i.id == activeMainCategory?.id ? "bg-primary text-primary-content" : "btn-primary"}`}
            >
              {i.name}
            </button>
          ))}
        </div>
      </section>
      <section className="flex flex-col">
        <article className="mb-[2rem] flex gap-[1rem]">
          <h2 className="text-3xl font-bold"> 서브 카테고리 </h2>
          <div className="flex items-center justify-center">
            <button
              onClick={() => modalProps.setIsOpenSubModalHandler(true)}
              className="btn btn-outline btn-sm aspect-square w-[2rem] hover:bg-secondary"
            >
              +
            </button>
          </div>
        </article>
        <div className="flex gap-[1rem]">
          {activeMainCategory?.childrenCategories?.map((i) => (
            <button key={i.id} className="btn btn-outline btn-secondary">
              {i.name}
            </button>
          ))}
        </div>
      </section>
      <Modal
        isOpen={modalProps.isMainModal}
        onClose={() => modalProps.setIsOpenMainModalHandler(false)}
        className="flex items-center justify-center"
      >
        <MainCategoryModal
          closeModal={() => modalProps.setIsOpenMainModalHandler(false)}
        />
      </Modal>
      <Modal
        isOpen={modalProps.isSubModal}
        onClose={() => modalProps.setIsOpenSubModalHandler(false)}
        className="flex items-center justify-center"
      >
        <SubCategoryModal
          activeMainCategory={activeMainCategory}
          closeModal={() => modalProps.setIsOpenSubModalHandler(false)}
        />
      </Modal>
    </div>
  );
};
export default Category


